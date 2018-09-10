import * as React from 'react';

export class ReimComponent extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      approved: false,
      credentials: {
        resolved: '',
        },
        errorMessage: '',
        reim: []
    }
  }

  public componentDidMount() {
    fetch('http://localhost:9001/reim', {
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(reim => {
        this.setState({reim});
      })
      .catch(err => {
        console.log(err);
      })
  }

  public handleInputChange(e: any) {
    console.log("fetching");
    fetch('http://localhost:9001/reim', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH'
  })
}


  public render() {
    return (
      <div>
      <table className="table table-bordered col" id="reim-table">
        <thead>
          <tr>
            <th scope="col">Author</th>
            <th scope="col">Amount</th>
            <th scope="col">Submitted</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Resolved</th>
          </tr>
        </thead>
        <tbody id="reim-table-body">
          {
            this.state.reim.map((reim: any) => (
              <tr key={reim.id}>
                <td>{reim.author}</td>
                <td>{reim.amount}</td>
                <td>{reim.submitted}</td>
                <td>{reim.description}</td>
                <td>{reim.type}</td>
                <td>{reim.status}</td>
                <td>
                {reim.resolved}
                  <form>
                      <label>
                        Approved
                        <input
                          name="approved"
                          type="checkbox"
                          onChange={this.handleInputChange} />
                      </label>
                      <br />
                    </form></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    );
  }
}

