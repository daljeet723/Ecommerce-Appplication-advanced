import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { newUserRequestBody } from "../types/user.js";

export const addUser = async (
    req: Request<{}, {}, newUserRequestBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        return next(new Error());

        const { name, email, photo, gender, dob, _id } = req.body;
        // const userExists = await User.findOne({ email: req.body.email });

        // if (userExists) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "User already exists"
        //     });
        // }
        const user = await User.create({
            name, email, photo, gender, dob:new Date(dob), _id
        });

       

        return res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`
        });

    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            return next(error); // Pass non-Error types to the error-handling middleware
        }
    }
}
