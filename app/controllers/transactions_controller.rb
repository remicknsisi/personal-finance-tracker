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

    def index
        transactions = Transaction.all
        render json: transactions, status: :ok
    end

    def destroy
        transaction = Transaction.find_by(id: params[:id])
        if @user && @user.id == transaction.user_id
            transaction.destroy
            render json: transaction, status: :ok
        else
            render json: { error: "You can only delete your own transactions!" }, status: :unauthorized
        end
    end

    private

    def transaction_params
        params.permit(:amount, :date, :description, :payment_method, :tag_id)
    end
end