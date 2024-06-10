import React, { useEffect, useState } from 'react'
import { data } from '../data'
import { useNavigate } from 'react-router-dom'

const Table = ({searchText, newUser}) => {

  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = sessionStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : data;
  })
  const [userData, setUserData] = useState(data || []);
  const navigate = useNavigate()

  const deleteUser = (userId) => {
    const newUserData = allUsers.filter(user => user.id !== userId);
    setAllUsers(newUserData);
    setUserData(newUserData);
    sessionStorage.setItem('users', JSON.stringify(newUserData));
    setTimeout(() => {
      alert('User deleted successfully.');
    }, 100);
  }

  useEffect(() => {
    if (newUser) {
      const updatedUsers = [...allUsers, {...newUser, id: allUsers.length + 1}];
      setAllUsers(updatedUsers);
      setUserData(updatedUsers);
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));
      setTimeout(() => {
        alert('User added successfully.');
      }, 100);
    }
  }, [newUser])
  

  useEffect(() => {
    if (!searchText || searchText.trim() === '') {
      setUserData(allUsers);
    } else {
      const searchedUser = allUsers.filter(user =>
        user?.email?.toLowerCase().includes(searchText.toLowerCase())
      );
      setUserData(searchedUser);
    }
  }, [searchText, allUsers]);
  

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
          {
            userData?.map((user, index)=>{
              return(
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td><span className='actionBtn' onClick={()=>deleteUser(user.id)}><i className="material-icons">delete</i></span></td>
                  <td><span className='actionBtn' onClick={()=>navigate('/details',{state:{user: user}})}>Details<span className="material-symbols-outlined">chevron_right</span></span></td>
                </tr>
              )
            })
          }
      </tbody>
    </table>
  )
}

export default Table