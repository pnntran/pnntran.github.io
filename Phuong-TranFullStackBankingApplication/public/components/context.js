const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

let currentUserIndex = 0;
function assignUserID(userID) {
    currentUserIndex = userID-1;
    return currentUserIndex;
};


function Card(props) {
  const [show, setShow]          = React.useState(true);
  const [status, setStatus]      = React.useState('');
  const [name, setName]          = React.useState('');
  const [email, setEmail]        = React.useState('');
  const [password, setPassword]  = React.useState('');
  const [deposit, setDeposit]    = React.useState('');
  const [withdraw, setWithdraw]  = React.useState('');
  const ctx = React.useContext(UserContext);
  let users = [...ctx.users];
  
  let balance = users[currentUserIndex].balance;
  let userName = users[currentUserIndex].name;
  console.log(`The user ${userName} has a balance of ${balance}.`);

function validate(field, label) {
  if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      alert(`Please enter an amount for ${label}.`);
      return false;
  }
  if (field === deposit) {
      if (deposit <= 0) {
          alert("The amount entered is invalid.");
          return false;
      }
  }
  if (field === withdraw) {
      if (withdraw <= 0) {
          alert("The amount entered is invalid.");
          return false;
      }
  }
  if (field === email) {
    if (email.includes('@') === true) return true;
    else {
      alert("The email entered is invalid.");
      return false;
    }
  }
  return true;
}

  function validateForm() {
      return password.length > 8 && name.length > 1 && email.length > 1;
  }

  function validateLogin() {
      return password.length > 8 && email.length > 1;
  }
  
  function handleCreate() {
      console.log(name, email, password);
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      ctx.users.push({id: users.length+1, name, email, password, balance: 0});
      setShow(false);

      console.log(name,email,password);
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
  }
  
  function clearForm() {
      setName('');
      setEmail('');
      setPassword('');
      setDeposit('');
      setWithdraw('');
      setShow(true);
  }

  function handleDeposit() {
      console.log(name, `Deposited: ${deposit}`);
      if (!validate(deposit,    'deposit'))    return;
        users[currentUserIndex].balance += Number(deposit);
        setShow(false);
        return;
  }

  function handleWithdraw() {
      if (!validate(withdraw,  'withdrawl'))    return;
      if ((Number(withdraw)) <= balance) {
          console.log(name, `Withdrawled: ${withdraw}`);
          users[currentUserIndex].balance -= Number(withdraw);
          setShow(false);
      } else {
          alert("Balance has insuffient funds for withdrawal.");
          return;
      }
      
  }

  function handleLogin() {
      if (!validate(email,       'email')) return;
      if (!validate(password, 'password')) return;
      for (let i = 0; i <= users.length - 1; i++){
          if (i === (users.length -1) && users[i].email !== email) {
              alert("Email or Password is incorrect. Please create an account or try logging in again.");
              setShow(true);
              clearForm();
              return;
          }
          if (email !== users[i].email){
              continue;
          }
          if (email === users[i].email && password !== users[i].password) {
              alert("Password is incorrect. Please try again.");
              setShow(true);
              setPassword('');
              return;
          }
          if (email === users[i].email && password === users[i].password){
              let userID = users[i].id;
              setShow(false);
              console.log(email, password, userID);
              assignUserID(userID);
              return;
          }
      }
  }

  function classes() {
      const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-dark';
      return 'card m-auto mb-3' + bg + txt;
  }

  return (
      <div className={classes()} style={{Width: "25rem"}}>
          <div className="card-header text-bg-warning text-dark">{props.header}</div>
          <div className="card-body">
              {props.title && (<h5 className="card-title">{props.title}</h5>)}
              {props.text && (<p className="card-text">{props.text}</p>)}
              {props.body}
              {props.handle && show ? (
                 <>
                 
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label text-end">Name</label>
                  <div class="col-sm-9">
                    <input type="input" className="form-control" id="name" placeholder="Name" value={name} onChange={e => setName(e.currentTarget.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label text-end">Email</label>
                  <div class="col-sm-9">
                 <input type="input" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                  </div>
                </div>
                 <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label text-end">Password</label>
                  <div class="col-sm-9">
                 <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                 </div>
                </div>
                 <button type="submit" disabled={!validateForm()} className="btn btn-warning" onClick={handleCreate} >Create Account</button>
                 </>
              ) : (
              props.submitButton && (
                 <>
                 <div className="text-center mb-3">
                     <span class="badge rounded-pill text-bg-success m-3">✓</span>
                     <p>An account for <strong>{name}</strong> was successfully created!</p>
                  </div>
                  <button type="submit" className="btn btn-warning" onClick={clearForm} >{props.submitButton}</button>
                 </>
              )
              )}
              {props.status && (<div id="'createStatus">{props.status}</div>)}
              {props.deposit && show ? (
                <>
                <h2 class="mb-3">{userName}'s Balance: <span class="badge badge-pill text-bg-warning">${balance}</span></h2> 
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">$</span>
                  </div>
                  <input type="number" className="form-control" id="withdraw" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
                </div>
                <button type="submit" className="btn btn-warning" onClick={handleDeposit} >Deposit</button>
                </>
              ) : (props.submitButtonDeposit && (
                  <>
                  <div className="text-center mb-3">
                  <span class="badge rounded-pill text-bg-success mb-3">✓</span>
                    <p>A deposit of <strong>${deposit}</strong> was successful!</p>
                  </div>
                  <button type="submit" className="btn btn-warning" onClick={clearForm} >Make Another Deposit</button>
                  </>
                )
              )}
              {props.withdraw && show ? (
                <>
                <h2 class="mb-3">{userName}'s Balance: <span class="badge badge-pill text-bg-warning">${balance}</span></h2>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">$</span>
                  </div>
                  <input type="number" className="form-control" id="withdraw" placeholder="Enter Withdrawl Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} /><br/>
                </div>
                <button type="submit" className="btn btn-warning" onClick={handleWithdraw} >Withdraw</button>
                </>
              ) : (props.submitButtonWithdraw && (
                  <>
                  <div className="text-center mb-3">
                  <span class="badge rounded-pill text-bg-success m-3">✓</span>
                    <p>A withdrawl of <strong>${withdraw}</strong> was successful!</p>
                  </div>
                  <button type="submit" className="btn btn-warning" onClick={clearForm} >Make Another Withdrawl</button>
                  </>
                  )
              )}
              {props.login && show ? (
                <>
                <p id="loggedInStatus">You are not yet logged in</p>
                
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label text-end">Email</label>
                  <div class="col-sm-9">
                    <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                  </div>
                </div>
                
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label text-end">Password</label>
                  <div class="col-sm-9">
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  </div>
                </div>
                <button type="submit" disabled={!validateLogin()} className="btn btn-warning col-3 mx-1" onClick={handleLogin} >Login</button>

                <a className="btn col-3 mx-1" href="login.html">Google Login</a>  
                </>
              ) : (props.submitButtonLogin && (
                <>
                <div className="text-center mb-3">
                <span class="badge rounded-pill text-bg-success m-3">✓</span>
                  <p id="loggedInStatus">Login for <strong>{userName}</strong> was successful!</p>
                </div>
                <button type="submit" className="btn btn-warning" onClick={clearForm} >Logout</button>
                </>
                )
              )}
              {props.allData && (
              <>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label text-end"><strong>Name:</strong> </label>
                <div class="col-sm-9">
                  <span class="form-control-plaintext">{props.allData[0]}</span>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label text-end"><strong>Email:</strong> </label>
                <div class="col-sm-9">
                  <span class="form-control-plaintext">{props.allData[1]}</span>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label text-end"><strong>Password:</strong> </label>
                <div class="col-sm-9">
                  <span class="form-control-plaintext">{props.allData[2]}</span>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label text-end"><strong>Balance:</strong> </label>
                <div class="col-sm-9">
                  <span class="form-control-plaintext">${props.allData[3]}</span>
                </div>
              </div>
              </>)}
          </div>
      </div>
  )
}
