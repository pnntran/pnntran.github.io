function Deposit() {  
    function handle() {
        return true;
    }
  
    return (
        <Card
          bgcolor="light"
          header="Deposit"
          deposit={handle}
          submitButtonDeposit="Deposit"
          body={(<img src="img/bankdeposit.jpg" className="img-fluid" alt="Bank Image"/>)}
        />
    )
  }