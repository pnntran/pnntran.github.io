function CreateAccount() {
  const ctx = React.useContext(UserContext);
  let users = [...ctx.users];
  let userNumber = users.length;

  function handle(data){
      ctx.users.push({id: userNumber, name: data.name, email: data.email, password: data.password, balance:100 });
      return true;
  }

  return (
      <Card
        bgcolor="light"
        header="Create Account"
        handle={handle}
        submitButton="Add Another Account"
        body={(<img src="img/bankcreate.jpg" className="img-fluid" alt="Bank Image"/>)}
      />
  )
}