import { useState } from 'react';
import { ethers } from 'ethers';
import Task from '../Task';
import { ITask } from '../../types';
import ToDoApp from '../../ToDoAppABI.json';

declare let window: any;
const deployAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const TaskList = () => {
  const [tasks, setTasks] = useState([] as ITask[]);
  console.log(tasks);
  const handleGet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(deployAddress, ToDoApp.abi, signer);
      try {
        const tasksFound = await contract.getMyTasks();
        console.log(tasksFound);
        setTasks(tasksFound);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
  };

  const createTask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(deployAddress, ToDoApp.abi, signer);
      const tx = await contract.createTask('test', 'test');
      await tx.wait();
    }
  };

  return (
    <main>
      <button onClick={handleClick}>Connect to metamask</button>
      <button onClick={handleGet}>Retrieve my tasks</button>
      <section>
        <button onClick={createTask}>Add one task</button>
        {tasks.map((task) => (
          <>
            <h6 key={tasks.indexOf(task)}>{task.title}</h6>
            <Task />
          </>
        ))}
      </section>
    </main>
  );
};

export default TaskList;
