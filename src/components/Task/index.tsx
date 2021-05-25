import { ethers } from 'ethers';
import ToDoApp from '../../ToDoAppABI.json';

const deployAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;
declare let window: any;

const Task = () => {
  const deleteTask = async (id: number) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(deployAddress, ToDoApp.abi, signer);
      const tx = await contract.deleteTask(id);
      await tx.wait();
    }
  };

  return (
    <div>
      <button onClick={() => deleteTask(0)}>Delete</button>
    </div>
  );
};

export default Task;
