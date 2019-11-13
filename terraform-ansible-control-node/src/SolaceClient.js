import solace from "solclientjs";

function SolaceClient() {
  // initialize defaults
  let factoryProps = new solace.SolclientFactoryProperties();
  factoryProps.profile = solace.SolclientFactoryProfiles.version10;
  solace.SolclientFactory.init(factoryProps);

  let client = {
    // variables
    session: null,
    topicSubscriptions: {}, // {{topicName: string, onMessageReceived: fn()}, ...}
    // functions
    log: null,
    connect: null,
    subscribe: null,
    publish: null
  };

  client.log = function log(line) {
    let now = new Date();
    let time = [
      ("0" + now.getHours()).slice(-2),
      ("0" + now.getMinutes()).slice(-2),
      ("0" + now.getSeconds()).slice(-2)
    ];
    let timestamp = "[" + time.join(":") + "] ";
    console.log(timestamp + line);
  };

  client.connect = async function connect() {
    return new Promise((resolve, reject) => {
      if (client.session !== null) {
        client.log("Already connected and ready to subscribe.");
        reject();
      }
      // if there's no session, create one
      try {
        client.session = solace.SolclientFactory.createSession({
          // expect env variables to be set at runtime
          url: process.env.SOLACE_URI,
          vpnName: process.env.SOLACE_VPN,
          userName: process.env.SOLACE_USER,
          password: process.env.SOLACE_PASSWORD
        });
      } catch (error) {
        client.log(error.toString());
      }
      // define session event listeners
      client.session.on(solace.SessionEventCode.UP_NOTICE, sessionEvent => {
        client.log("=== Successfully connected and ready to subscribe. ===");
        resolve();
      });
      client.session.on(
        solace.SessionEventCode.CONNECT_FAILED_ERROR,
        sessionEvent => {
          client.log(
            "Connection failed to the message router: " +
              sessionEvent.infoStr +
              " - check correct parameter values and connectivity!"
          );
          process.exit(1);
        }
      );
      client.session.on(solace.SessionEventCode.DISCONNECTED, sessionEvent => {
        client.log("Disconnected.");
        if (client.session !== null) {
          client.session.dispose();
          //client.subscribed = false;
          client.session = null;
        }
      });
      client.session.on(
        solace.SessionEventCode.SUBSCRIPTION_ERROR,
        sessionEvent => {
          client.log(
            "Cannot subscribe to topic: " + sessionEvent.correlationKey
          );
          delete client.topicSubscriptions[sessionEvent.correlationKey];
          process.exit(1);
        }
      );
      // state machine would simplify logic here
      client.session.on(
        solace.SessionEventCode.SUBSCRIPTION_OK,
        sessionEvent => {
          if (
            client.topicSubscriptions[sessionEvent.correlationKey] &&
            client.topicSubscriptions[sessionEvent.correlationKey].isSubscribed
          ) {
            delete client.topicSubscriptions[sessionEvent.correlationKey];
            client.log(
              `Successfully unsubscribed from topic: ${sessionEvent.correlationKey}`
            );
          } else {
            client.topicSubscriptions[
              sessionEvent.correlationKey
            ].isSubscribed = true;
            client.log(
              `Successfully subscribed to topic: ${sessionEvent.correlationKey}`
            );
          }
        }
      );
      // define message event listener
      client.session.on(solace.SessionEventCode.MESSAGE, message => {
        let topicName = message.getDestination().getName();
        client.topicSubscriptions[topicName].eventHandler(message);
      });
      // connect the session
      try {
        client.session.connect();
      } catch (error) {
        client.log(error.toString());
      }
    });
  };

  client.subscribe = function subscribe(topicName, eventHandler) {
    if (!client.session) {
      client.log(
        "[WARNING] Cannot subscribe because not connected to Solace message router!"
      );
      return;
    }
    if (client.topicSubscriptions[topicName]) {
      client.log(`[WARNING] Already subscribed to ${topicName}.`);
      return;
    }
    client.log(`Subscribing to ${topicName}`);
    client.topicSubscriptions[topicName] = {
      eventHandler: eventHandler,
      isSubscribed: false
    }; // gets updated asynchronously
    try {
      client.session.subscribe(
        solace.SolclientFactory.createTopicDestination(topicName),
        true, // generate confirmation when subscription is added successfully
        topicName, // use topic name as correlation key
        10000 // 10 seconds timeout for this operation
      );
    } catch (error) {
      client.log(error.toString());
    }
  };

  client.publish = function publish(topic, payload) {
    if (!client.session) {
      client.log(
        "[WARNING] Cannot publish because not connected to Solace message router!"
      );
      return;
    }
    client.log(`Publishing message ${payload} to topic ${topic}...`);
    let message = solace.SolclientFactory.createMessage();
    message.setDestination(
      solace.SolclientFactory.createTopicDestination(topic)
    );
    message.setBinaryAttachment(payload);
    message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
    try {
      client.session.send(message);
      client.log("Message published.");
    } catch (error) {
      client.log(error.toString());
    }
  };

  return client;
}

export default SolaceClient;
