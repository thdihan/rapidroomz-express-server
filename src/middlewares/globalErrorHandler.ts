import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error";
        errorSources = Object.values(err.errors).map(
            (val: any) => {
                return {
                    path: val?.path,
                    message: val?.message,
                };
            },
        );
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === "development" ? err?.stack : null,
    });
};
