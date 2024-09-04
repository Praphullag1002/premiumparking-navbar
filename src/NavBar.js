import React from 'react'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const NavBar = ({
  navigationMenuOptions,
  userSignedIn,
  manageRootPath,
  websiteHost
}) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' fixed='top'>
      <Navbar.Brand href={manageRootPath}>
        <Image src='Icon-Small.png' alt='Icon' />
        <span> Operator Dashboard</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      {userSignedIn && (
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {navigationMenuOptions.map((option, index) =>
              option.isSection ? (
                <NavDropdown
                  key={index}
                  title={option.name}
                  id={`nav-dropdown-${index}`}
                >
                  {option.options.map((sectionItem, idx) =>
                    sectionItem.isGroup ? (
                      <React.Fragment key={idx}>
                        <NavDropdown.Header>
                          {sectionItem.name}
                        </NavDropdown.Header>
                        {sectionItem.options.map((sectionOption, id) => (
                          <NavDropdown.Item href={sectionOption.link} key={id}>
                            {sectionOption.name}
                          </NavDropdown.Item>
                        ))}
                      </React.Fragment>
                    ) : (
                      <NavDropdown.Item href={sectionItem.link} key={idx}>
                        {sectionItem.name}
                      </NavDropdown.Item>
                    )
                  )}
                </NavDropdown>
              ) : (
                <Nav.Link href={option.link} key={index}>
                  {option.name}
                </Nav.Link>
              )
            )}
            <Nav.Link href={websiteHost} target='_blank'>
              Website
            </Nav.Link>
            <NavDropdown title='Admin' id='admin-dropdown'>
              <NavDropdown.Item href='/manage/users/edit'>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/users/sign_out'
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('sign-out-form').submit()
                }}
              >
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      )}
      <form
        id='sign-out-form'
        action='/users/sign_out'
        method='POST'
        style={{ display: 'none' }}
      >
        <input type='hidden' name='_method' value='delete' />
      </form>
    </Navbar>
  )
}

export default NavBar
