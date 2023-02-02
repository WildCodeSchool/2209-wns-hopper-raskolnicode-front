import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { CREATE_BLOG, CREATE_BLOG_BY_USER, CREATE_USER, CREATE_USER_BY_ROLE } from '../../graphql/mutations'
import { faker } from '@faker-js/faker'
import { GET_USERS } from '../../graphql/queries'
import { UserContext } from '../../UserContext'

const Faker = () => {

  const user = useContext(UserContext)

  type FakerFormProps = {
    entity: string,
    role?: string,
    userId?: number,
    quantity: number
  }

  const [fakerForm, setFakerForm] = useState<FakerFormProps>({
    entity: '',
    role: undefined,
    userId: undefined,
    quantity: 10
  })

  type MessageProps = {
    success?: string,
    error?: string
  }

  const [message, setMessage] = useState<MessageProps>({})

  const updateFakerForm = (e: any) => {
    console.log(e.target.value)
    const inputName = e.target.name
    const inputValue = e.target.value
    setFakerForm({ ...fakerForm, [inputName]: inputValue })
  }

  const [userMutation] = useMutation(CREATE_USER_BY_ROLE);
  const [blogMutation] = useMutation(CREATE_BLOG_BY_USER);

  const mutations: any = []
  mutations['user'] = userMutation
  mutations['blog'] = blogMutation

  const { data: users } = useQuery(GET_USERS);

  type Fake = {
    email: string,
    password: string,
    role?: string,
    userId?: number
  }

  const createUser = async () => {
    return {
      email: faker.internet.email(),
      password: 'test1234',
      role: fakerForm.role,
    }
  }

  const createBlog = async () => {
    return {
      name: `The ${faker.word.adjective()} blog`,
      description: faker.lorem.sentence(),
      userId: fakerForm.userId && +fakerForm.userId
    }
  }

  const generateFakes = async (entity: string) => {
    try {
      for (let i = 0; i < fakerForm.quantity; i++) {
        let data
        switch (entity) {
          case 'user':
            data = await createUser()
            break
          case 'blog':
            console.log('its a blog')
            data = await createBlog()
            break
        }
        console.log('data', data)
        await mutations[entity]({
          variables: { data },
        })
      }
      setMessage({ success: `✅ ${fakerForm.quantity} ${fakerForm.entity}(s) créé(s)` })
    } catch (err) {
      if (fakerForm.entity === '') {
        setMessage({ error: 'Sélectionnez une entité' })
      } else {
        setMessage({ error: `⚠️ Une erreur s'est produite` })
      }

    }
  }

  const submitFaker = async (e: any, entity: string) => {
    e.preventDefault()
    setMessage({})
    generateFakes(entity)
    // setFakerForm({ ...fakerForm, entity: '' })
  }

  return (
    <div className='bg-secondary text-white p-2'>
      <Form onSubmit={e => submitFaker(e, fakerForm.entity)} className='px-2'>
        <Row>
          <Form.Select
            className='py-0 mx-1'
            name='entity'
            value={fakerForm.entity}
            onChange={e => updateFakerForm(e)}
            style={{ height: '2rem', width: 'fit-content' }}>
            <option>Entité</option>
            <option value="user">User</option>
            <option value="blog">Blog</option>
          </Form.Select>
          {
            fakerForm.entity === "user" &&
            <Form.Select
              className='py-0 mx-1'
              name='role'
              value={fakerForm.role}
              onChange={e => updateFakerForm(e)}
              style={{ height: '2rem', width: 'fit-content' }}>
              <option value="">Rôle</option>
              <option value="SUPERADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">Utilisateur</option>
            </Form.Select>
          }
          {
            fakerForm.entity === "blog" &&
            <Form.Select
              className='py-0 mx-1'
              name='userId'
              value={fakerForm.userId}
              onChange={e => updateFakerForm(e)}
              style={{ height: '2rem', width: 'fit-content' }}>
              <option>Utilisateur</option>
              {
                users?.getUsers.map((user: any, idx: number) =>
                  <option key={idx} value={user.id}>{`${user.email} (id : ${user.id}) [${user.role}]`}</option>
                )
              }
            </Form.Select>
          }
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
          {message.success && <p className='mb-0 text-success' style={{ height: '2rem', width: 'fit-content' }}>{message.success}</p>}
          {message.error && <p className='mb-0 text-danger' style={{ height: '2rem', width: 'fit-content' }}>{message.error}</p>}
        </Row>
      </Form>
      {/* <pre>{JSON.stringify(fakerForm, null, 2)}</pre> */}
    </div>
  )
}

export default Faker