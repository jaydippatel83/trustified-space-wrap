# Push Protocol

**We have used Push Protocol to broadcast notifications to certificate and badge holders**

https://github.com/jaydippatel83/trustified-space-wrap/blob/master/src/context/Web3Context.js

```javascript

import * as PushAPI from "@pushprotocol/restapi";

const notifyHolders = async (nftContract, message) => { 
    let collectors = await getCollectors(nftContract);  
    const PK = process.env.REACT_APP_PUSH_PRIVATE_KEY; 
    const Pkey = `0x${PK}`; 
    const signer = new ethers.Wallet(Pkey); 
    try { 
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 4, // target
        identityType: 2, // direct payload
        notification: {
          title: `Trustified`,
          body: `Trustified" - Truely Certified`,
        },
        payload: {
          title: `Trustified`,
          body: message,
          cta: "",
          img: "",
        },
        recipients: ["eip155:80001:0x0a4349A6b51c8454fcff20af639dA1FbEF8A2501"], // recipient address
        channel: "eip155:80001:0x54bFfe5482759f49e24601AbD4cF833AA94e3787", // your channel address
        env: "staging",
      });
      setLoadingMsg(false); 
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      setLoadingMsg(false);
      console.log(err);
    }
  };

```
