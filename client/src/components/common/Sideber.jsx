import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlineIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setmemo } from "../../redux/features/memoSlice";

const Sideber = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res);
        dispatch(setmemo(memos));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  return (
    <Drawer
      container={window.document.body}
      variant="parmanent"
      open="true"
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontweight="700">
              name:{user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>

        {/* 余白 */}
        <Box sx={{ pt: "10px" }}></Box>
        {/* 余白 */}

        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontweight="700">
              お気に入り
            </Typography>
            <IconButton>
              <AddBoxOutlineIcon fontsize="small" />
            </IconButton>
          </Box>

          {/* 余白 */}
          <Box sx={{ pt: "10px" }}></Box>
          {/* 余白 */}
        </ListItemButton>

        {/* 余白 */}
        <Box sx={{ pt: "10px" }}></Box>
        {/* 余白 */}

        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontweight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlineIcon fontsize="small" />
            </IconButton>
          </Box>
        </ListItemButton>

        {memos.map((item, index) = (
        <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            key = {item._id}
        >
            <Typography>
              {item.icon}{item.title}
            </Typography>
          </ListItemButton>
            ))}
      </List>
    </Drawer>
  );
};

export default Sideber;
