const mongoose = require('mongoose');
const {Customer} = require('./Core/CustomerModel');
const {Employee} = require('./Core/EmployeeModel');
const {MenuItem} = require ('./Core/MenuItemModel');
const {Order} = require('./Core/OrderModel');
const {OrderItem} = require('./Core/OrderItemModel');
const {Product} = require('./Core/ProductModel');
const {Reservation} = require('./Core/ReservationModel');
const {Restaurant} = require('./Core/RestaurantModel');
const {Table} = require('./Core/TablesModel');
import bodyParser from 'body-parser';
import express from 'express';
import {Request, Response} from 'express';
import { CustomerRepository } from './DataStore/CustomreRepository';
import { EmployeeRepository } from './DataStore/EmployeeRepository';
import { MenuItemRepository } from './DataStore/MenuItemRepository';
import { ProductRepository } from './DataStore/ProductRepository';
import { RestaurantRepository } from './DataStore/RestaurantRepository';
import { ReservationRepository } from './DataStore/ReservationRepository';
import { TableRepository } from './DataStore/TableRepository';
import { OrderRepository } from './DataStore/OrderRepository';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

const customerRepository = new CustomerRepository();
const employeeRepository = new EmployeeRepository();
const menuItemRepository = new MenuItemRepository();
const productRepository = new ProductRepository();
const reservationRepository = new ReservationRepository();
const restaurantRepository = new RestaurantRepository();
const tableRepository = new TableRepository();
// REST API for Customer
// get all customers
router.get('/customers', async (req: Request, res: Response) => {
    const customers = await customerRepository.getCustomers();
    if (customers.length > 0) 
        res.status(200).json(customers);
    else if(customers.length === 0)
        res.status(404).json({message: 'Customers list is empty'});
    else
        res.status(404).json({message: 'No customer list found'});
});
// get customer by name
router.get('/customer/:name', async (req: Request, res: Response) => {
    const customer = await customerRepository.getCustomerByName(req.params.name);
    if (customer)
        res.status(200).json(customer);
    else
        res.status(404).json({message: 'Customer ' + req.params.name + ' not found'});
});
// delete customer by name
router.delete('/customer/:name', async (req: Request, res: Response) => {
    const customer = await customerRepository.deleteCustomerByName(req.params.name);
    res.status(200).json('Restaurant ' + req.params.name + ' deleted');
});
// add customer from body
router.post('/customer', async (req: Request, res: Response) => {
    const customer = await customerRepository.addCustomer(req.body);
    res.status(200).json(customer);
});
// update customer from body
router.put('/customer/', async (req: Request, res: Response) => {
    const customer = await customerRepository.updateCustomer(req.body);
    res.status(200).json(customer);
});
// add loyalty points to customer
router.put('/customer/:name/:loyaltyPoints', async (req: Request, res: Response) => {
    const customer = await customerRepository.addLoyaltyPoints(req.params.name, req.params.points);
    res.status(200).json(customer);
});
// REST API for Employee
// get all employees
router.get('/employees', async (req: Request, res: Response) => {
    const employees = await employeeRepository.getEmployees();
    if (employees.length > 0)
        res.status(200).json(employees);
    else if(employees.length === 0)
        res.status(404).json({message: 'Employees list is empty'});
    else
        res.status(404).json({message: 'No employee list found'});
});
// get employee by id
router.get('/employee/:id', async (req: Request, res: Response) => {
    const employee = await employeeRepository.getEmployeeById(req.params.id);
    if (employee)
        res.status(200).json(employee);
    else
        res.status(404).json({message: 'Employee if id: ' + req.params.id + ' not found'});
});
// get employee by name
router.get('/employee/:name', async (req: Request, res: Response) => {
    const employee = await employeeRepository.getEmployeeByName(req.params.name);
    if (employee)
        res.status(200).json(employee);
    else
        res.status(404).json({message: 'Employee ' + req.params.name + ' not found'});
});
// delete employee by id
router.delete('/employee/:id', async (req: Request, res: Response) => {
    const employee = await employeeRepository.deleteEmployeeById(req.params.id);
    res.status(200).json('Employee ' + req.params.id + ' deleted');
});
// delete employee by name
router.delete('/employee/:name', async (req: Request, res: Response) => {
    const employee = await employeeRepository.deleteEmployeeByName(req.params.name);
    res.status(200).json('Employee ' + req.params.name + ' deleted');
});
// add employee from body
router.post('/employee', async (req: Request, res: Response) => {
    const employee = await employeeRepository.addEmployee(req.body);
    res.status(200).json(employee);
});
// update employee from body
router.put('/employee/', async (req: Request, res: Response) => {
    const employee = await employeeRepository.updateEmployee(req.body);
    res.status(200).json(employee);
});
// get employees by restaurant name
router.get('/employees/:restaurantName', async (req: Request, res: Response) => {
    const employees = await employeeRepository.getEmployeesByRestaurantName(req.params.restaurantName);
    if (employees.length > 0)
        res.status(200).json(employees);
    else if(employees.length === 0)
        res.status(404).json({message: 'Employees list is empty'});
    else
        res.status(404).json({message: 'No employee list found'});
});
// REST API for MenuItem
// get all menu items
// REST API for Product
// get all products
router.get('/products', async (req: Request, res: Response) => {
    const products = await productRepository.getProducts();
    if (products.length > 0)
        res.status(200).json(products);
    else if(products.length === 0)
        res.status(404).json({message: 'Products list is empty'});
    else
        res.status(404).json({message: 'No product list found'});
});
// get product by id
router.get('/product/:id', async (req: Request, res: Response) => {
    const product = await productRepository.getProductById(req.params.id);
    if (product)
        res.status(200).json(product);
    else
        res.status(404).json({message: 'Product if id: ' + req.params.id + ' not found'});
});
// delete product by id
router.delete('/product/:id', async (req: Request, res: Response) => {
    const product = await productRepository.deleteProductById(req.params.id);
    res.status(200).json('Product ' + req.params.id + ' deleted');
});
// add product from body
router.post('/product', async (req: Request, res: Response) => {
    const product = await productRepository.addProduct(req.body);
    res.status(200).json(product);
});
// update product from body
router.put('/product/', async (req: Request, res: Response) => {
    const product = await productRepository.updateProduct(req.body);
    res.status(200).json(product);
});
// REST API for Restaurant
// get all restaurants
router.get('/restaurants', async (req: Request, res: Response) => {
    let restaurants = await restaurantRepository.getRestaurant();
    if (restaurants.length>0) {
        res.json(restaurants);
    } else if (restaurants.length === 0)
        res.status(200).send('Restaurant list is empty');
    else
        res.status(404).send('No restaurants found');
    }
});
// get restaurant by name
router.get('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant)
    {
        res.json(restaurant);
    }
    else
    {
        res.status(404).send('Restaurant not found');
    }
});
// delete restaurant by name
router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).send('Restaurant deleted');
});
// add restaurant from body
router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    await restaurantRepository.addRestaurant(restaurant);
    res.status(200).send('Restaurant added');
});
// update restaurant from body
router.put('/restaurant/', async (req: Request, res: Response) => {
    const restaurant = req.body;
    res.status(200).json(restaurant);
});
app.listen(3000);
