import React, { Component } from 'react'
import $ from 'jquery'
import SearchCard from './SearchCard'

const columns = [
  {
    label: 'Company Name',
    id: 'companyName'
  }, {
    label: 'Job title',
    id: 'jobTitle'
  }, {
    label: 'Location',
    id: 'location'
  }, {
    label: 'Date',
    id: 'date'
  }, {
    label: '',
    id: 'func'
  }
]

export default class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      rows: [],
      salary: '',
      addedList: []
    }
  }

  search () {
    if (!this.state.searchText) {
      window.alert('Search bar cannot be empty!!')
      return
    }
    $.ajax({
      url: 'http://localhost:5000/search',
      method: 'get',
      data: {
        keywords: this.state.searchText,
        salary: this.state.salary
      },
      contentType: 'application/json',
      success: (data) => {
        const res = data.map((d, i) => {
          return {
            id: i,
            jobTitle: d.jobTitle,
            companyName: d.companyName,
            location: d.location,
            date:d.date
          }
        })
        this.setState({
          rows: res
        })
      }
    })
  }

  deleteTheApplication (id) {
    const newRows = this.state.rows.filter(app => {
      return app.id !== id
    })
    const newAddedList = this.state.addedList.filter(app => {
      return app.id !== id
    })
    this.setState({
      rows: newRows,
      addedList: newAddedList
    })
  }

  // open the card modal according to the application in parameter
  showEditModal (job, mode) {
    // console.log(job)
    this.setState({
      showModal: true,
      job: job,
      modalMode: mode
    })
  }

  handleCloseEditModal () {
    this.setState({
      showModal: false,
      job: null
    })
  }

  addToWaitlist (job) {
    const newAddedList = this.state.addedList
    newAddedList.push(job.id)
    // console.log(job)

    $.ajax({
      url: 'http://localhost:5000/applications',
      method: 'POST',
      data: JSON.stringify({
        application: job
      }),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      contentType: 'application/json',
      success: (msg) => {
        console.log(msg)
        alert('Added item!')
      }
    })
    this.setState({
      addedList: newAddedList
    })
  }

  removeFromWaitlist (job) {
    const newAddedList = this.state.addedList.filter(v => {
      return v !== job.id
    })
    this.setState({
      addedList: newAddedList
    })
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  setSalary (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  render () {
    const rows = this.state.rows

    let applicationModal = null
    if (this.state.job) {
      applicationModal = (
        <SearchCard
          show={this.state.showModal}
          submitFunc={this.addToWaitlist.bind(this)}
          mode={this.state.modalMode}
          application={this.state.job}
          handleCloseEditModal={this.handleCloseEditModal.bind(this)}
          deleteApplication={this.deleteTheApplication.bind(this)}
        />
      )
    }

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-5 input-group mb-3'>
              <input type='text' id='searchText' className='form-control' placeholder='Keyword' aria-label='Username' aria-describedby='basic-addon1' value={this.state.searchText} onChange={this.handleChange.bind(this)} />
            </div>
            <div className='col-5 mb-3' style={{ padding: 0.4 + 'em' }}>
              <label>Salary Range Per Annum :  </label>
              <select name='salary' id='salary' onChange={this.setSalary.bind(this)} value={this.state.salary}>
                <option value=''>Please select salary range</option>
                <option value='$50K'>$0K - $50K</option>
                <option value='$75K'>$51K - $100K</option>
                <option value='$125K'>$101K - $150K</option>
                <option value='$175K'>$151K - $200K</option>
              </select>
            </div>
            <div>
              <button type='button' className='btn btn-secondary' onClick={this.search.bind(this)}>Search</button>
            </div>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              {columns.map(column => {
                return <th key={column.id + '_th'}>{column.label}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              return (
                <tr key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]
                    if (column.id !== 'func') {
                      return <td key={column.id}>{value}</td>
                    } else {
                      const addButton = this.state.addedList.includes(row.id)
                        ? <button type='button' className='btn btn-outline-secondary' onClick={this.removeFromWaitlist.bind(this, row)}> Added </button>
                        : <button type='button' className='btn btn-secondary' onClick={this.showEditModal.bind(this, row)}> Add </button>
                      return (
                        <td key={row.id + '_func'}>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-md-4'>
                                {addButton}
                              </div>
                                                    &nbsp;&nbsp;
                              <div className='col-md-2'>
                                <button type='button' style={{ backgroundColor: 'red' }} className='btn btn-secondary' onClick={this.deleteTheApplication.bind(this, row.id)}> Delete </button>
                              </div>
                            </div>
                          </div>

                        </td>
                      )
                    }
                  })}

                </tr>
              )
            })}
          </tbody>
        </table>

        {applicationModal}
      </div>
    )
  }
}
