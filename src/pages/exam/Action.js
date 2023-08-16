//GET Exma
// export function getAllexams() {
//     return (dispatch) => {
//         const url = `${constants.baseURL}/exams`;

//         Get(url)
//             .then(response => {
//                 const reversedExam = response.data.reverse(); // Reverse the array of users
//                 dispatch(getusersuccess(reversedExam));
//             })
//             .catch(error => dispatch(getuserError(error.response.data)));
//     };
// }

export function getexamsuccess(payload) {
    return { type: constant.GET_EXAM_SUCCESS, payload }//action object
}

export function getexamError(payload) {
    return { type: constant.GET_EXAM_ERROR, payload }
}

// POST User
export function addExam(data) {
    return (dispatch) => {
        const url = `${constants.baseURL}/exams`
         Post(url, data).then(response => dispatch(addexamsuccess(data)))
            .catch(error => dispatch(addexamError(error.response.data)))
    }
}

export function addexamsuccess(payload) {
    return { type: constant.ADD_EXAM_SUCCESS, payload }//action object
}

export function adduserError(payload) {
    return { type: constant.ADD_EXAM_ERROR, payload }
}

// UPDATE User
export function updateExam(data) {

    return (dispatch) => {
        const url = `${constants.baseURL}/exams/${data.id}`
         Put(url, data).then(response => dispatch(updateusersuccess(data)))
            .catch(error => dispatch(updateuserrror(error.response.data)))
    }
}

export function updateexamsuccess(payload) {
    return { type: constant.UPDATE_EXAM_SUCCESS, payload }//action object
}

export function updateexamrror(payload) {
    return { type: constant.UPDATE_EXAM_ERROR, payload }
}

// DELETE User
export function deleteExam(id) {
    return (dispatch) => {
        const url = `${constants.baseURL}/user/${id}`
         Delete(url).then(response => dispatch(deleteexamsuccess(id)))
            .catch(error => dispatch(deleteexamError(error.response.data)))
    }
}

// export function deleteusersuccess(payload) {
//     return { type: constant.DELETE_USER_SUCCESS, payload }//action object
// }

// export function deleteuserError(payload) {
//     return { type: constant.DELETE_USER_ERROR, payload }
// }

// export function getSingleuser(id) {
//     return { type: constant.SINGLE_USER_SUCCESS, payload: id }//action object
// }