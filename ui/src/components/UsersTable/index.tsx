import React, { useEffect, useState } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Modal } from "@mui/material";

import API from "../../utils/api";
import { BASE_URL } from "../../config";
import styles from "./styles.module.scss";

type UserType = {
  email: string;
  id: string;
};

const UsersTable = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const deleteUser = () => {
    const axiosConfig = {
      url: `${BASE_URL}/user/${selectedUser?.id}`,
      method: "DELETE",
    };
    API(axiosConfig)
      .then(({ response, err }) => {
        if (err) {
          throw err;
        }
        return response.data;
      })
      .then((data) => {
        getUsers();
        handleCloseModal();
      })
      .catch(() => {});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const getUsers = () => {
    const axiosConfig = {
      url: `${BASE_URL}/user/getAll`,
      method: "GET",
    };

    API(axiosConfig)
      .then(({ response, err }) => {
        if (err) {
          throw err;
        }
        return response.data;
      })
      .then((data) => {
        setRows(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "email", headerName: "email", width: 200 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params: GridValueGetterParams) => {
        const onClick = () => {
          setSelectedUser(params.row);
          setShowModal(true);
        };

        return <Button onClick={onClick}>Delete</Button>;
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      {rows.length > 0 ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      ) : (
        <CircularProgress />
      )}

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div className={styles.ModalText}>
            Are you sure to delete user <span>{selectedUser?.email}</span>?
          </div>
          <div className={styles.ModalButtons}>
            <Button onClick={handleCloseModal} variant="contained">
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteUser}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersTable;
