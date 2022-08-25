const Route         = ReactRouterDOM.Route;
const Link          = ReactRouterDOM.Link;
const HashRouter    = ReactRouterDOM.HashRouter;
const UserContext   = React.createContext(null);


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
        return password.length > 8 && name.length > 1;
    }
    
    function handleCreate() {
        console.log(name, email, password);
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        ctx.users.push({id: users.length+1, name, email, password, balance: 100});
        setShow(false);
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
          //ctx.users.push({deposit});
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
        if (!validate(name,     'name'))     return;
        if (!validate(password, 'password')) return;
        for (let i = 0; i <= users.length - 1; i++){
            if (i === (users.length -1) && users[i].name !== name) {
                alert("User Name or Password is incorrect. Please create an account or try logging in again.");
                setShow(true);
                clearForm();
                return;
            }
            if (name !== users[i].name){
                continue;
            }
            if (name === users[i].name && password !== users[i].password) {
                alert("Password is incorrect. Please try again.");
                setShow(true);
                setPassword('');
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
            <div className="card-header bg-warning text-dark">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.handle && show ? (
                   <>
                   {/* Name<br/> */}
                   <input type="input" className="form-control" id="name" placeholder="Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                   {/* Email address<br/> */}
                   <input type="input" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                   {/* Password<br/> */}
                   <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                   <button type="submit" disabled={!validateForm()} className="btn btn-warning" onClick={handleCreate} >Create Account</button>
                   </>
                ) : (
                props.submitButton && (
                   <>
                   <div className="text-center mb-3">
                       <span class="badge rounded-pill badge-success m-3">✓</span>
                       <p>An account for {name} was successfully created!</p>
                    </div>
                    <button type="submit" className="btn btn-warning" onClick={clearForm} >{props.submitButton}</button>
                   </>
                )
                )}
                {props.status && (<div id="'createStatus">{props.status}</div>)}
                {props.deposit && show ? (
                  <>
                  <h2 class="mb-3">{userName}'s Balance: <span class="badge badge-pill bg-warning">${balance}</span></h2> 
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
                    <span class="badge rounded-pill badge-success mb-3">✓</span>
                      <p>A deposit of ${deposit} was successful!</p>
                    </div>
                    <button type="submit" className="btn btn-warning" onClick={clearForm} >Make Another Deposit</button>
                    </>
                  )
                )}
                {props.withdraw && show ? (
                  <>
                  <h2 class="mb-3">{userName}'s Balance: <span class="badge badge-pill bg-warning">${balance}</span></h2>
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
                    <span class="badge rounded-pill badge-success m-3">✓</span>
                      <p>A withdrawl of ${withdraw} was successful!</p>
                    </div>
                    <button type="submit" className="btn btn-warning" onClick={clearForm} >Make Another Withdrawl</button>
                    </>
                    )
                )}
                {props.login && show ? (
                  <>
                  <input type="input" className="form-control" id="name" placeholder="Name" value={name} onChange={e => setName(e.currentTarget.value)}/><br/> 
                  <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <button type="submit" disabled={!validateLogin()} className="btn btn-warning" onClick={handleLogin} >Login</button>
                  </>
                ) : (props.submitButtonLogin && (
                  <>
                  <div className="text-center mb-3">
                  <span class="badge rounded-pill badge-success m-3">✓</span>
                    <p>Login for {name} was successfully created!</p>
                  </div>
                  <button type="submit" className="btn btn-warning" onClick={clearForm} >Continue to Account</button>
                  </>
                  )
                )}
                {props.allData && (
                <>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label text-right"><strong>Name:</strong> </label>
                  <div class="col-sm-9">
                    <span class="form-control-plaintext">{props.allData[0]}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label text-right"><strong>Email:</strong> </label>
                  <div class="col-sm-9">
                    <span class="form-control-plaintext">{props.allData[1]}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label text-right"><strong>Password:</strong> </label>
                  <div class="col-sm-9">
                    <span class="form-control-plaintext">{props.allData[2]}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label text-right"><strong>Balance:</strong> </label>
                  <div class="col-sm-9">
                    <span class="form-control-plaintext">${props.allData[3]}</span>
                  </div>
                </div>
                </>)}
            </div>
        </div>
    )
}