function NavBar(){
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div class="container-fluid">
        <a className="navbar-brand" href="#">🏦 BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" id="createaccount" href="#/CreateAccount/" title="Select to create an account">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="login" href="/#/login" title="Select to login to an account">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="deposit" href="#/deposit/" title="Select to deposit to balance">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="withdraw" href="#/withdraw/" title="Select to withdraw from balance">Withdraw</a>
            </li>   
            {/* <li className="nav-item">
              <a className="nav-link" id="alldata" href="#/alldata/" title="Select to see all data">All Data</a>
            </li>      */}
          </ul>
        </div>
      </div>
    </nav>

  );
}