const Web3 = require("aion-web3");
const helper = require('./helper');
const logger = helper.getLogger('AIONVOTEWEB3');

// Create Web3 Object
const web3 = new Web3(new Web3.providers.HttpProvider("https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=475ebaea58c14fff9605d0bb72a082e6"));

// Main Contract Address
const contractAddrA = "0xa015ee57d98cf84431f9ccbee08a3626dfc82b420cb26c97a72b1018103052c7";
const contractAddrB = "0xa015ee57d98cf84431f9ccbee08a3626dfc82b420cb26c97a72b1018103052c7";
const contractAddrC = "0xa015ee57d98cf84431f9ccbee08a3626dfc82b420cb26c97a72b1018103052c7";
const maincontractAddr = "0xa0e56a77b4119a8d0c86a7844892b5c6eff87afbaa0c1fb4a93b6f617d3ae278";

// Select Account
const privateKey = "ba2c5a5eff7e5c47002e2e19332971be9a01370d4ee166089a233986ed3f807ca36c2cf8f4c215e5a5cbb5d3597ca57829cc96828dcce7d3e0bdcd04246b30b2";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);


  addContractType = async (address, type) => {
    logger.debug("\n\n ====================== Add Contract Type =========================\n\n");
    logger.debug("Address %s Type %s", address, type);
    try{
      let data = web3.avm.contract.method('addPollTypes').inputs(["Address", "String"],[address, type]).encode();
    
      // Create transaction object
      const txObject = {
        from: account.address,
        to: maincontractAddr,
        data: data
      };
    
      // Response
      let initResponse = await web3.eth.sendTransaction(txObject)
      .on('transactionHash', function(hash){
          logger.debug(hash);
        })

      .on('receipt', function(receipt){
          logger.debug(hash);
        })

      .on('confirmation', function(confirmationNumber, receipt){ 
        logger.debug("Confirmation Number ", confirmationNumber);
        logger.debug("Receipt ", receipt);
       })

      .on('error', (error)=>{
        logger.error(error)
      }); // If a out of gas error, the second parameter is the receipt.

    
      logger.debug("===================== " + JSON.stringify(initResponse) +" =============================");
    
      // decode the response
      let decodedResponse = await web3.avm.contract.decode('int', initResponse); 
      logger.debug("===================== " + decodedResponse +" =============================");
      return decodedResponse;

    }catch(err){
      throw err;
    }
  },

  getContractType = async () =>{
    try{
      let data = web3.avm.contract.method('getContractType').inputs(["int"],["1"]).encode();
    
      // Create transaction object
      const txObject = {
        from: account.address,
        to: maincontractAddr,
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
      let decodedResponse = await web3.avm.contract.decode('int', initResponse); 
      logger.debug("===================== " + decodedResponse +" =============================");
      return decodedResponse;

    }catch(err){
      throw err;
    }
  },

  getContractAddress = async () =>{},

  updateProposal = async () =>{},

  removeProposal = async () =>{},

  getAddProposalContract = async () =>{},

  getProposalDescriptionContract = async () =>{},

  getWalletBalanceContract = async () =>{},

  getVoteContract = async () =>{},

  getTallyVotesContract = async () =>{},

  getHasProposalPassedContract = async () =>{},

  isEnddatedContract = async () =>{},

  master = async () => {
  try{
    let data = web3.avm.contract.method('addPollTypes').inputs(["Address", "String"],["0xa015ee57d98cf84431f9ccbee08a3626dfc82b420cb26c97a72b1018103052c7", "typeA"]).encode();
  
    // Create transaction object
    const txObject = {
      from: account.address,
      to: maincontractAddr,
      data: data,
      gasPrice: 10000000000,
      gas: 2000000,
      type: '0xf' // method call ('0x2' for deployment)
    };
  
    // Response
    let initResponse = await web3.eth.sendTransaction(txObject)
    .on('transactionHash', function(hash){
        logger.debug(hash);
      })
      .on('receipt', function(receipt){
        logger.debug(hash);
      })
    .on('confirmation', function(confirmationNumber, receipt){ 
      logger.debug("Confirmation Number ", confirmationNumber);
      logger.debug("Receipt ", receipt);
     })
    .on('error', (error)=>{
      logger.error(error)
    }); // If a out of gas error, the second parameter is the receipt.

  
    logger.debug("===================== " + JSON.stringify(initResponse) +" =============================");
  
    // decode the response
    let decodedResponse = await web3.avm.contract.decode('int', initResponse); 
    logger.debug("===================== " + decodedResponse +" =============================");
    return decodedResponse;

  }catch(err){
    throw err;
  }

 }

exports.addContractType = addContractType; 
exports.master = master; 

  
