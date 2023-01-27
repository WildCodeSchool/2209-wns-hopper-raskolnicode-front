import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { CREATE_USER } from '../../graphql/mutations'
import { faker } from '@faker-js/faker'

const Faker = () => {

  const [fakerForm, setFakerForm] = useState({
    entity: '',
    quantity: 10
  })
  const [message, setMessage] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  const updateFakerForm = (e: any) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFakerForm({ ...fakerForm, [inputName]: inputValue })
  }

  const [createUser] = useMutation(CREATE_USER);

  const submitFaker = async (e: any) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    switch (fakerForm.entity) {
      case 'user':
        try {
          for (let i = 0; i < fakerForm.quantity; i++) {
            const randomUser = {
              email: faker.internet.email(),
              password: 'random1234'
            }
            await createUser({
              variables: {
                data: {
                  email: randomUser.email,
                  password: randomUser.password,
                },
              },
            })
          }
          setMessage(`✅ ${fakerForm.quantity} user(s) créé(s)`)
        } catch (err) {
          setError(`⚠️ ${fakerForm.quantity} une erreur`)
        }
        break
      default:
        console.log("No entity has been selected")
        setError(`⚠️ merci de choisir une entité`)
        break;
    }
    setFakerForm({ ...fakerForm, entity: '' })
  }

  return (
    <div className='bg-dark text-white p-2'>
      <Form onSubmit={e => submitFaker(e)} className='px-2'>
        <Row>
          <Form.Select
            className='py-0 mx-1'
            name='entity'
            value={fakerForm.entity}
            onChange={e => updateFakerForm(e)}
            style={{ height: '2rem', width: 'fit-content' }}>
            <option>Entité</option>
            <option value="user">User</option>
          </Form.Select>
          <Form.Control
            type="number"
            name="quantity"
            placeholder='Quantité'
            className='py-0 mx-1'
            value={fakerForm.quantity}
            onChange={e => updateFakerForm(e)}
            style={{ height: '2rem', width: '7rem' }} />
          <Button variant="success"
            type="submit"
            className='py-0 mx-1'
            style={{ height: '2rem', width: 'fit-content' }}
          >Fake</Button>
          { message && <p className='mb-0 text-success' style={{ height: '2rem', width: 'fit-content' }}>{message}</p> } 
          { error && <p className='mb-0 text-danger' style={{ height: '2rem', width: 'fit-content' }}>{error}</p> }
        </Row>
      </Form>
      {/* <pre>{JSON.stringify(fakerForm, null, 2)}</pre> */}
    </div>
  )
}

export default Faker