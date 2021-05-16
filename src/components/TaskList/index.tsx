import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ToDoApp from '../../ToDoAppABI.json';

declare let window: any;
const deployerAddress = '0xACB96CFDEDc1200ADd35aD5E03F048370a45BAe6';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  console.log(window.ethereum);
  console.log(tasks);

  useEffect(() => {
    const getTasks = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          deployerAddress,
          ToDoApp.abi,
          provider
        );
        const tasksFound = await contract.getMyTasks();
        setTasks(tasksFound);
      }
    };
    getTasks();
  }, []);

  const handleClick = async () => {
    await window.ethereum.request({
      method: 'eth_RequestAccounts',
    });
  };

  const createTask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        deployerAddress,
        ToDoApp.abi,
        signer
      );
      const tx = await contract.createTask('test', 'test');
      await tx.wait();
    }
  };

  return (
    <main>
      <button onClick={handleClick}>Connect to metamask</button>
      <section>
        <button onClick={createTask}>Add one task</button>
      </section>
    </main>
  );
};

export default TaskList;
