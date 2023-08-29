import React, { Component } from 'react'
import Usertable from '../../../component/user/Usertable';
import * as useraction from '../action'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  allUser: state.userStore.allUser,
  singleUser: state.userStore.user
});

const mapDispatchToProps = (dispatch) => ({
  initUserRequest: () => dispatch(useraction.getAlluser()),
  updateUserRequest: (id) => dispatch(useraction.updateUser(id)),
  addUserRequest: (data) => dispatch(useraction.addUser(data)),
  deleteUserRequest: (id) => dispatch(useraction.deleteUser(id)),
  getSingleUserRequest: (id) => dispatch(useraction.getSingleuser(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(Usertable);