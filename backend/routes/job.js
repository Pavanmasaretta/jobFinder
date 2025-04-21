const express = require('express');
const router = express.Router();
const job = require('../models/job.schema');

router.get('/', async (req, res,next) => {
    try {
        const jobs = await job.find()
        res.send(jobs)
    } catch (error) {
        next(error);
    }
});

router.get('/:id', authMiddleware,async (req, res,next) => {
    const id  = req.params.id;
    try {
        const job = await job.findById(id)
        if(job)
            res.send(job)
        else{
            const error = new Error('Job not found')
            error.name = 'NotFoundError'
            throw error
    }
}
    catch (error) {
        next(error);
    }
});

router.post('/', authMiddleware, async (req, res,next) => {
    const { title, description, location, salary, type, skills } = req.body;
    try {
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            type,
            skills: skills.split(',').map(skill => skill.trim()),
            createdBy: req.user
        });
        res.send(job);
    } 
    catch (error) {
        next(error);
    }
})

router.put('/:id', authMiddleware, async (req, res,next) => {
    const id  = req.params.id;
    const { title, description, location, salary, type, skills } = req.body;
    try {
        const job = await job.findById(id);
        if(job.createdBy.toString() !== req.user.toString()){
            const error = new Error('You are not authorized to update this job')
            error.name = 'ForbiddenError'
            throw error
        }
        await job.findByIdAndUpdate(id, {
            title,
            description,
            location,
            salary,
            type,
            skills: skills.split(',').map(skill => skill.trim()),
            updatedBy: req.user
        }, { new: true });
        res.send(job);
    } 
    catch (error) {
        next(error);
    }
});

router.delete('/:id', authMiddleware, async (req, res,next) => {
    const id  = req.params.id;
    try {
        const job = await job.findById(id);
        if(job.createdBy.toString() !== req.user.toString()){
            const error = new Error('You are not authorized to delete this job')
            error.name = 'ForbiddenError'
            throw error
        }
        await job.findByIdAndDelete(id);
        res.send({ message: 'Job deleted successfully' });
    } 
    catch (error) {
        next(error);
    }
}
);
module.exports = router;