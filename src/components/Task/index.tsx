import { ethers } from 'ethers';
import ToDoApp from '../../ToDoAppABI.json';

const deployerAddress = '0xACB96CFDEDc1200ADd35aD5E03F048370a45BAe6'; //add in .env file
declare let window: any;

const Task = () => {
  const deleteTask = async (id: number) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        deployerAddress,
        ToDoApp.abi,
        signer
      );
      const tx = await contract.deleteTask(id);
      await tx.wait();
    }
  };

  return (
    <div>
      <button onClick={() => deleteTask(0)}></button>
    </div>
  );
};

export default Task;
