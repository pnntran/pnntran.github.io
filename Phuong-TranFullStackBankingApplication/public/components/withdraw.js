function Withdraw() {
  
  function handle () {
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