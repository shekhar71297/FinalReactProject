
import Datatable from '../../../component/voucher/Datatable';
import * as voucheraction from '../Action';
import { connect } from 'react-redux';


const mapStateToProps =(state)=>({
    allvouchers: state.VoucherStore.allvouchers,
});
const mapDispatchToprops = (dispatch) => ({
    initVoucherRequest: () => dispatch(voucheraction.getAllVouchers()),
    updateVoucherRequest: (data) => dispatch(voucheraction.updateAllVoucher(data)),
  });

export default connect(mapStateToProps, mapDispatchToprops) (Datatable);
