function Withdraw() {
    //const ctx = React.useContext(UserContext);
  
    function handle () {
        //ctx.users.push({name: data.name, withdraw: data.withdraw});
        return true;
    }
  
    return (
        <Card
          bgcolor="light"
          header="Withdraw"
          withdraw={handle}
          submitButtonWithdraw="Withdrawl Successful"
          body={(<img src="img/bankwithdraw.jpg" className="img-fluid" alt="Bank Image"/>)}
        />
    )
  }