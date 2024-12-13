import { follow } from '../../users-reducer'
import { usersAPI } from '../../../api/usersAPI'
import { APIResponseType, ResultCodesEnum } from '../../../api/api'
jest.mock('../../../api/usersAPI')

const UserAPIMock = usersAPI

const result: APIResponseType = {
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {},
}

//@ts-ignore
UserAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('', async () => {
	const thunk = follow(1)
	const dispatchMock = jest.fn()

	//@ts-ignore
	await thunk(dispatchMock)

	expect(dispatchMock).toHaveBeenCalledTimes(3)
})
