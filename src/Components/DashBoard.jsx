import React, { useState } from 'react'
import Table from './Table'
import styled from 'styled-components'
import useDebounce from './useDebounce'

const Wrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: auto;
  padding: 0 20px;
  padding-top: 80px;
  box-sizing: border-box;

  input[type=text]{
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 40px;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .material-icons{
    cursor: pointer;
  }

  .actionBtn{
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
`

const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserDetailsForm = styled.form`
  width: fit-content;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  button {
    cursor: pointer;
    display: block;
    margin-top: 20px;
  }

  label{
    display: block;
    margin-top: 6px;
    margin-bottom: 8px;
  }

  .container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
`

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [newUser, setNewUser] = useState(null);

  const SearchUsers = (e) => {
    setSearchQuery(e?.target?.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };
    setNewUser(newUser)
    setShowForm(false); 
  };


  return (
    <Wrapper>
      <TableActions>
        {
          !showForm && (
            <>
              <input type='text' onChange={SearchUsers} placeholder='Search by email' />
              <button onClick={() => setShowForm(true)}>Create</button>
            </>
          )
        }
      </TableActions>
      {
        showForm && (
          <UserDetailsForm onSubmit={onSubmit}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" autoComplete='false' required/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Email" autoComplete='false' required/>

            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" placeholder="Phone No." autoComplete='false' required/>

            <label htmlFor="subject">Address</label>
            <input type="text" id="address" name="address" placeholder="Address" autoComplete='false' required/>
            
            <div style={{display: 'flex', columnGap: '20px'}}>
              <button type="submit">Submit</button>
              <button type="button" onClick={()=>setShowForm(false)} >Cancel</button>
            </div>

          </UserDetailsForm>
        )
      }
      <Table searchText={debouncedSearchQuery} newUser={newUser}/>
    </Wrapper>
  )
}

export default Dashboard