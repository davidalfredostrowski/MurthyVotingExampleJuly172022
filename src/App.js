import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';
import { VOTING_ABI, VOTING_ADDRESS } from './config'

class App extends Component {
        state = { votes: '' }
        componentWillMount(){
                this.loadBlockchainData()
        }
 
	async loadBlockchainData(){
                //const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-44-242-136-205.us-west-2.compute.amazonaws.com:8545"))

         // does not work        const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-44-242-136-205.us-west-2.compute.amazonaws.com:8585"))
		const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-44-242-136-205.us-west-2.compute.amazonaws.com:8545"))
		this.setState( { web3 } )
		var account;

		// does not work right now - have to read in automatic


                web3.eth.getAccounts().then((f) => {
                        account = f[0];
                })
		// MOD THIS TO READ DIRCTLY FROM BUILD DIRECTORY
		//	let jsonData = require('../../build/contract/Voting.json')
		//just copy the json file to the src directory
		let jsonData = require('./Voting.json');
		console.log(jsonData.abi)
		console.log(jsonData.networks)

                //const contract = new web3.eth.Contract(VOTING_ABI);
                const contract = new web3.eth.Contract(jsonData.abi); 


		// deployed via the web3 console interface...
                //contract.options.address = "0x7Ce283138b1489907Aa6Ba4601Eb08AcdDBA1892";

		 contract.options.address = "0x8A0d3E8490550D3743BeAb5219BAfE75aeCaCbC3";

		this.setState( { contract }) 
                //contract.options.address = "0x71789831d83d4C8325b324eA9B5fFB27525480b5";

                const candidates = {"Johnny": "candidate-1", "Amber": "candidate-2"}

                console.log("one") 
                await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)
		console.log("two")
                await contract.methods.voteForCandidate(web3.utils.asciiToHex('Johnny')).send({gas: 140000, from: '0xBE1BAF491970DD73e6099C70EE964AB8a3A40A62' });

		console.log("three")


                await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)




        }

  constructor(props){
	  	super(props)
	  	this.state = {
			account: '',
			JohnnyVote: 0,
			AmberVote: 0,
			loading: true
			//data: todoList   // new portion

		}

	console.log("constructor")

  this.voteForCandidate = this.voteForCandidate.bind(this)

 //  this.voteForJohnny = this.voteForJohnny.bind(this)
 //  this.voteForAmber = this.voteForAmber.bind(this)
  }

      voteForCandidate = ()=> {

      
	this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex('Johnny')).send({gas: 140000, from: '0xBE1BAF491970DD73e6099C70EE964AB8a3A40A62' });
        console.log("voteForCandidate")
  	this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Johnny')).call(console.log)


      }


//    state = {
//      johnnyCount: 1
//     , amberCount: 1
//    }


 //   voteForJohnny = () => {
 ////       this.setState((prevState) =>({ johnnyCount : prevState.johnnyCount + 1 }));
//	console.log("vj   one"); 


  // this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex('Johnny')).send({gas: 140000, from: '0x73a0f2A8C094931b24c9e8717F8bb2C582f1cA95'});
//	console.log("vj two");
 //  this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Johnny')).call(console.log)
//
//
//
 //   };

//    voteForAmber = () => {
//        this.setState((prevState) => ({ amberCount : prevState.amberCount + 1   }));
 //   this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex('Amber')).send({gas: 140000, from: '0x73a0f2A8C094931b24c9e8717F8bb2C582f1cA95'});

   // this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Amber')).call(console.log)

  //  };


//      <button onClick={() => voteForCandidate()}> vote Again! </button>
render(){

        return (
            <>
                <div>
                    <button onClick={this.voteForCandidate}> Uni Instruction</button>
                    <button onClick={this.Scllevel}> School Instruction</button>
                </div>
                <h5>Johnny count: {this.state.johnnyCount}</h5>
                <h5>Amber count: {this.state.amberCount}</h5>
            </>
        );
    }





}
export default App;
