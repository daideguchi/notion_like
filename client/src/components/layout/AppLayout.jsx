// import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { use } from '../../../../server/src/v1/routes';
// import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";
import Sideber from "../common/Sideber";
import { useDispatch } from "react-redux";
import {setUser}from "../../redux/features/userSlice"

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      //ページ切り替える度に認証チェック(トークン持ってるかどうか確認)
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
        // setLoading(false);
      } else {
        //ユーザーを保存する..userがグローバルで使えるようになる
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* 左側のサイドバー */}
        <Sideber />
        {/* 右側の本体コンテンツ */}
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
