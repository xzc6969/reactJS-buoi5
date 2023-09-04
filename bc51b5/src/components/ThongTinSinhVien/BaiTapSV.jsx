import React, { Component } from "react";
import ThongTinSV from "./ThongTinSV";
import UserManagement from "./UserManagement";

export default class BaiTapSV extends Component {
  render() {
    return (
      <div className="w-75 mx-auto mt-5">
       <ThongTinSV />
       <UserManagement />
        
      </div>
    );
  }
}
