function Spa() {
    return (
      <HashRouter>
        <NavBar/>
        <UserContext.Provider value={{users:[{id: 1, name:'Jen Jones',email:'jj@email.com',password:'jenjones123',balance:100}]}}>
          <div className="container mt-5 pt-5" style={{}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>      
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );