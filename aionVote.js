const Web3 = require("aion-web3");
const helper = require('./scripts/helper');
const logger = helper.getLogger('AIONVOTEWEB3');

// Create Web3 Object
const web3 = new Web3(new Web3.providers.HttpProvider("https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=475ebaea58c14fff9605d0bb72a082e6"));

// Main Contract Address
const contractAddr = "0xa0f1131e44b3fe040e6573aa70e06f4511cf615afbb0140523d1341ba75c9e3b";

// Select Account
const privateKey = "ba2c5a5eff7e5c47002e2e19332971be9a01370d4ee166089a233986ed3f807ca36c2cf8f4c215e5a5cbb5d3597ca57829cc96828dcce7d3e0bdcd04246b30b2";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);


  const addPollType = async () => {
    let data = web3.avm.contract.method('addPollTypes').inputs(["Address", "String"],["0xa02eb418d8190296b46b6db313395a688703ed5d9282f52c5336559d2f9dee36", "typeA"]).encode();
    
    // Create transaction object
    const txObject = {
      from: account.address,
      to: contractAddr,
      data: data,
      gasPrice: 10000000000,
      gas: 2000000,
      type: '0xf' // method call ('0x2' for deployment)
    };
  
    // Response
    let initResponse = await web3.eth.call(txObject)
    .then(req=>{
       return req;
    }).catch((error)=>{
         throw error;
    });
  
    logger.debug("===================== " + JSON.stringify(initResponse) +" =============================");
  
    // decode the response
    let decodedResponse = await web3.avm.contract.decode('string', initResponse)
    .then(res => {
      return helper.getSuccessMessage(res);
    }).catch((error) => {
         throw error;
    }); 
  
    logger.debug("===================== " + decodedResponse +" =============================");
  
    return decodedResponse;
  };
  
  addPollType();