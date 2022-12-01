function Home(){
  return (
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Welcome Message"
      title="Welcome to the BadBank"
      text="Create an account with BadBank or Login from the navigation menu."
      body={(<img src="img/bankwelcome.jpg" className="img-fluid" alt="ank Image"/>)}
    />
  );  
}
