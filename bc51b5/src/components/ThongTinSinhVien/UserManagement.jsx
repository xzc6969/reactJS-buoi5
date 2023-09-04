import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteSVAction, selectedSVAction } from "../../store/action/userAction";

class UserManagement extends Component {
  state = {
    keyword:"",
  }
  renderContent = () => {
    const data = this.props.danhSachSV.filter((element)=>{
      return element.name.toLowerCase().indexOf(this.state.keyword.toLowerCase())!==-1
    })
    return data.map((element) => {
      return (
        <tr className="bg-light">
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>{element.phone}</td>
          <td>{element.email}</td>

          <td>
            <button onClick={()=> this.props.dispatch(selectedSVAction(element))} className="btn btn-info mr-2">EDIT</button>
            <button onClick={()=> this.props.dispatch(deleteSVAction(element))} className="btn btn-danger">DELETE</button>
          </td>
        </tr>
      );
    });
  };
  handleChange =(event)=>{
    this.setState({
      keyword: event.target.value,
    })
  }
  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold bg-dark text-white">
          USER MANAGEMENT
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
              onChange={this.handleChange}
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead className="bg-dark">
              <tr className="text-white">
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
                {this.renderContent()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    danhSachSV: state.SVReducer.listSV,
  };
};
export default connect(mapStateToProps)(UserManagement);
