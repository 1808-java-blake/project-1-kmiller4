import { Request, Response } from 'express';
import express from 'express';
import * as reimDao from '../dao/reim-dao';
//import { authMiddleware } from '../security/authorization-middleware';

// all routes defined with this object will imply /ers
export const reimRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursements
 */
reimRouter.get('', [
  //authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all reimbursements');
      let reim = await reimDao.findAll();
      resp.json(reim);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find reimbursement by id
 */
reimRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving reimbursement with id  ${id}`)
  try {
    let reim = await reimDao.findById(id);
    if (reim !== undefined) {
      resp.json(reim);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Create reimbursement
 */
reimRouter.post('', async (req, resp) => {
    console.log('creating reimbursement')
    try {
      const id = await reimDao.createRiem(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })

