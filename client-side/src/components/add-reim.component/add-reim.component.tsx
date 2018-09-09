import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IState {
  credentials: {
    id: number,
    amount: number,
    submitted: string,
    resolved: string,
    description: string,
    author: number
    resolver: number,
    status: number,
    type: number
  },
  errorMessage: string
}

export class AddReimComponent extends React.Component<RouteComponentProps<{}>, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      credentials: {
        amount: 0,
        author: 0,
        description: '',
        id: 0,
        resolved: '',
        resolver: 0,
        status: 0,
        submitted: '',
        type: 0,
      },
      errorMessage: ''
    }
  }

  public amountChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        amount: e.target.value
      }
    });
  }

  public descriptionChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        description: e.target.value
      }
    });
  }

  public typeChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        type: e.target.value
      }
    });
  }
    
    public authorChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            author: e.target.value
          }
        });
      }
    
      public resolverChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            resolver: e.target.value
          }
        });
      }
    
      public idChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            id: e.target.value
          }
        });
    }
        public resolvedChange = (e: any) => {
            this.setState({
              ...this.state,
              credentials: {
                ...this.state.credentials,
                resolved: e.target.value
              }
            });
          }
        
          public submittedChange = (e: any) => {
            this.setState({
              ...this.state,
              credentials: {
                ...this.state.credentials,
                submitted: e.target.value
              }
            });
          }
        
          public statusChange = (e: any) => {
            this.setState({
              ...this.state,
              credentials: {
                ...this.state.credentials,
                status: e.target.value
              }
            });
          }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:9001/reim', {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.setState({
            ...this.state,
            errorMessage: 'Invalid'
          });
        } else if (resp.status === 200) {
          return resp.json();
        } else {
          this.setState({
            ...this.state,
            errorMessage: 'Successfully added reimbursement'
          });
        }
        throw new Error('Success');
      })
      .then(resp => {
        localStorage.setItem('reim', JSON.stringify(resp));
        // send user to a reimbursement screen, button to add reimbursement
        this.props.history.push('/reim');
      })
      .catch(err => {
        console.log(err);
      });
  }


  public render() {
    const { errorMessage, credentials } = this.state;

    return (
      <form className="form-signin" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please Fill Out All Fields</h1>

        <label htmlFor="inputAmount" className="sr-only">Amount</label>
        <input
          onChange={this.amountChange}
          value={credentials.amount}
          type="text"
          id="inputAmount"
          className="form-control"
          placeholder="Amount"
          required />

        <label htmlFor="inputDescription" className="sr-only">Description</label>
        <input
          onChange={this.descriptionChange}
          value={credentials.description}
          type="description"
          id="inputDescription"
          className="form-control"
          placeholder="Description"
          required />

          <label htmlFor="inputType" className="sr-only">Type</label>
        <input
          onChange={this.typeChange}
          value={credentials.type}
          type="type"
          id="inputType"
          className="form-control"
          placeholder="Type"
          required />

          <label htmlFor="inputAuthor" className="sr-only">Author</label>
        <input
          onChange={this.authorChange}
          value={credentials.author}
          type="author"
          id="inputAuthor"
          className="form-control"
          placeholder="Author"
          required />

        <label htmlFor="inputSubmitted" className="sr-only">Submitted</label>
        <input
          onChange={this.submittedChange}
          value={credentials.submitted}
          type="submitted"
          id="inputSubmitted"
          className="form-control"
          placeholder="Submitted"
          required />

          <label htmlFor="inputStatus" className="sr-only">Status</label>
        <input
          onChange={this.statusChange}
          value={credentials.status}
          type="status"
          id="inputStatus"
          className="form-control"
          placeholder="Status"
          required />

          <label htmlFor="inputResolved" className="sr-only">Resolved</label>
        <input
          onChange={this.resolvedChange}
          value={credentials.resolved}
          type="text"
          id="inputResolved"
          className="form-control"
          placeholder="Resolved"
          required />

        <label htmlFor="inputResolver" className="sr-only">Resolver</label>
        <input
          onChange={this.resolverChange}
          value={credentials.resolver}
          type="resolver"
          id="inputResolver"
          className="form-control"
          placeholder="Resolver"
          required />

          <label htmlFor="idType" className="sr-only">ID</label>
        <input
          onChange={this.idChange}
          value={credentials.id}
          type="id"
          id="inputid"
          className="form-control"
          placeholder="ID"
          required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    );
  }
}

