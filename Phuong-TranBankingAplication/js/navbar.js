function NavBar(){
    return(
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <a className="navbar-brand" href="#">🏦 BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/" title="Select to create an account">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/login/" title="Select to login to an account">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/" title="Select to deposit to the balance">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/" title="Select to withdraw from the balance">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/balance/" title="Select to see balance">Balance</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/" title="Select to see all accounts">All Accounts</a>
            </li>          
          </ul>
        </div>
      </nav>
      </>
    );
  }