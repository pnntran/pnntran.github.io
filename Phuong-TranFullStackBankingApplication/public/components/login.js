function Login() {

  function handle () {
    return true;
  }

  return (
      <Card
        bgcolor="light"
        header="Login"
        login={handle}
        submitButtonLogin="Welcome to Bad Bank!"
        body={(<img src="img/banklogin.jpg" className="img-fluid" alt="Bank Image"/>)}
      />
  )
}