class TransactionsController < ApplicationController
    def create
        transaction = @user.transactions.new(transaction_params)
        if transaction.valid?
            transaction.save
            render json: transaction, status: :created
        else
            render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def transaction_params
        params.permit(:amount, :date, :description, :payment_method)
    end
end