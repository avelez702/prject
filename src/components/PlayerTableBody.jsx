import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import React, { useState, useEffect } from 'react';
import { getPlayers } from '../appState/players';
import { addUsers } from '../appState/players';
import { getUsers } from '../appState/players';
import { deleteUSer } from '../appState/players';
import { modifyUser } from '../appState/players';
import Avatar from './Avatar';
import styles from './PlayerTableBody.module.scss';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

import { nanoid } from '@reduxjs/toolkit';

//newID
const { v4: uuidv4 } = require('uuid');

export default function PlayerTableBody() {
  const dispatch = useDispatch();

  const [modName, setModname] = useState('');
  const [modCountry, setModCountry] = useState('');
  const [modWinnings, setModWinnings] = useState('');
  const [modImageUrl, setmodImageUrl] = useState('');
  const [passId, passSetID] = useState(nanoid());

  const [id, setID] = useState(uuidv4());
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [winnings, setWinnings] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const [state, setState] = useState([]);
  const players = useSelector(getPlayers);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [lgShow, setLgShow] = useState(false);

  const onModify = (id) => {
    //lets match the id with the database

    //save the item if you switch... ID IS the same
    players.map((state) => {
      if (state.id == id) {
        //console.log(state.id, state.name);

        passSetID(state.id);
        setModname(state.name);
        setModCountry(state.country);
        setModWinnings(state.winnings);
        setmodImageUrl(state.modImageUrl);
      }
    });
  };

  const submitModify = (evt) => {
    evt.preventDefault();

    //make sure you pass the ID
    const postData = {
      name: name,
      country: country,
      winnings: winnings,
      imageUrl:
        'https://i.pravatar.cc/40?u=1547cbe1-e06a-417e-97dc-ce1de248d4e9',
    };

    //console.log(passThisId, postData)

    dispatch(modifyUser(passId, postData));

    setName('');
    setCountry('');
    setWinnings('');
    setLgShow(false);
    //reload page after submit
    //window.location.reload(false);
  };

  //delete the user based on ID
  const handleDeleteSubmit = (evt) => {
    //evt.preventDefault();
    if (window.confirm('Are you sure you want to remove this player')) {
      //delete this entry
      dispatch(deleteUSer(passId));
      setShow(false);

      //reload page after submit
      window.location.reload(false);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //alert(`Submitting  ${name} ${winnings} ${country}`)

    const postData = {
      name: name,
      country: country,
      winnings: winnings,
      imageUrl: imageUrl,
    };

    dispatch(addUsers(postData));

    setName('');
    setCountry('');
    setWinnings('');
    setShow(false);

    //reload page after submit
    window.location.reload(false);
  };

  return (
    <tbody className={styles.tbody}>
      <tr>
        <td>
          <Button
            style={{ width: 300, marginLeft: 10, marginBottom: 15 }}
            variant="primary"
            onClick={handleShow}
          >
            Add Player
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: '#435363' }} closeButton>
          <Modal.Title>Add a Player</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#a9afb4' }}>
          <form>
            <label style={{ marginLeft: 10 }}>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: 30, marginBottom: 10 }}
              />
            </label>
            <label>
              Winnings:
              <input
                type="text"
                value={winnings}
                onChange={(e) => setWinnings(e.target.value)}
                style={{ marginLeft: 16, marginBottom: 10 }}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ marginLeft: 25, marginBottom: 10 }}
              />
            </label>
            <label>
              Picture:
              <input
                value={imageUrl}
                onChange={(e) => setimageUrl(e.target.value)}
                style={{ marginLeft: 25 }}
                type="file"
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#435363' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header style={{ backgroundColor: '#435363' }} closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Modify Player or Remove Player
            <br></br>
            Name: {modName}
            <br></br>
            Winnings: {modWinnings}
            <br></br>
            Country: {modCountry}
            <br></br>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#a9afb4' }}>
          <form>
            <label style={{ marginLeft: 10 }}>
              Name:
              <input
                placeholder={modName}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: 30, marginBottom: 10 }}
              />
            </label>
            <label>
              Winnings:
              <input
                placeholder={modWinnings}
                type="text"
                value={winnings}
                onChange={(e) => setWinnings(e.target.value)}
                style={{ marginLeft: 16, marginBottom: 10 }}
              />
            </label>
            <label>
              Country:
              <input
                placeholder={modCountry}
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ marginLeft: 25, marginBottom: 10 }}
              />
            </label>
            <label>
              Picture:
              <input
                style={{ marginLeft: 25 }}
                onChange={(e) => setimageUrl(e.target.value)}
                type="file"
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#435363' }}>
          <Button
            variant="danger"
            onClick={() => {
              setLgShow(false);
              handleDeleteSubmit();
            }}
          >
            Remove Player
          </Button>
          <Button variant="primary" onClick={submitModify}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {players.map(({ id, name, winnings, country, imageUrl }) => (
        <tr key={id} className={styles.row}>
          <td className={styles.avatar}>
            <Avatar src={imageUrl} />
          </td>

          <td>
            {name}
            <button
              onClick={() => {
                setLgShow(true);
                onModify(id);
              }}
              style={{ marginLeft: 10 }}
            >
              Modify or Remove
            </button>
          </td>

          <td className={styles.winnings}>
            {winnings.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </td>
          <td>
            <div className={styles.country}>
              <Avatar small className={styles.countryAvatar}>
                <Flag code={country} />
              </Avatar>
              {country}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
