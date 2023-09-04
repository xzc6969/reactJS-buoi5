import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { addSVAction, updateSVAction } from "../../store/action/userAction";

class ThongTinSV extends Component {
  idInputRef = createRef();
  nameInputRef = createRef();
  phoneInputRef = createRef();
  emailInputRef = createRef();

  state = {
    id: "",
    name: "",
    phone: "",
    email: "",
  };
  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.editSV && nextProps.editSV.id !== currentState.id) {
      currentState = nextProps.editSV;
    }
    return currentState;
  }
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      // dynamic thông qua object literals
      [event.target.name]: event.target.value,
    });
  };
  validateRequired = (value, ref, mess) => {
    if (value) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mess;
    return false;
  };
  validateText = (value, ref, mess) => {
    if (
      /^[ aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/.test(
        value
      )
    ) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mess;
    return false;
  };
  validateNumber = (value, ref, mess) => {
    if (/^[0-9]+$/.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mess;
    return false;
  };
  validateEmail = (value, ref, mess) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mess;
    return false;
  };

  handleSubmit = (event) => {
    console.log(this.state.id==this.props.danhSachSV[0].id);
    event.preventDefault();
    let isValid = true;
    isValid &=
      this.validateRequired(
        this.state.id,
        this.idInputRef.current,
        "ID không được để trống"
      ) &&
      this.validateNumber(
        this.state.id,
        this.idInputRef.current,
        "Vui lòng nhập đúng định dạng"
      );
    isValid &=
      this.validateRequired(
        this.state.name,
        this.nameInputRef.current,
        "Họ và tên không được để trống"
      ) &&
      this.validateText(
        this.state.name,
        this.nameInputRef.current,
        "Vui lòng nhập đúng định dạng"
      );
    isValid &=
      this.validateRequired(
        this.state.phone,
        this.phoneInputRef.current,
        "Số điện thoại không được để trống"
      ) &&
      this.validateNumber(
        this.state.phone,
        this.phoneInputRef.current,
        "Vui lòng nhập đúng định dạng"
      );
    isValid &=
      this.validateRequired(
        this.state.email,
        this.emailInputRef.current,
        "Email không được để trống"
      ) &&
      this.validateEmail(
        this.state.email,
        this.emailInputRef.current,
        "Vui lòng nhập đúng định dạng"
      );
    if (isValid) {
      for(const sv of this.props.danhSachSV){
        if (this.state.id===sv.id) {
          this.props.dispatch(updateSVAction(this.state));
          break;

        } else {
          this.props.dispatch(addSVAction(this.state));
          break;
        }
      }
      }
     
    this.setState({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  render() {
    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã sinh viên</label>
                  <input
                    value={this.state.id}
                    onChange={this.handleChange}
                    name="id"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger" ref={this.idInputRef}></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger" ref={this.nameInputRef}></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger" ref={this.phoneInputRef}></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger" ref={this.emailInputRef}></span>
                </div>
              </div>
            </div>

            <button className="btn btn-success mr-2">Thêm sinh viên</button>
            <button type="reset" className="btn btn-warning">
              Clear
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    editSV: state.SVReducer.selectedSV,
    danhSachSV: state.SVReducer.listSV,
  };
};
export default connect(mapStateToProps)(ThongTinSV);
