import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const rotateAnimation = keyframes`
	0% {
		transform: rotate(0deg);
		border-radius: 0px;
	}
	50% {
		border-radius: 100px;
	}
	100% {
		transform: rotate(360deg);
		border-radius: 0px;
	}
`;

const Emoji = styled.span`
	font-size: 20px;
	color: ${(props) => props.theme.textColor};
`;

const Box = styled.div`
	width: 200px;
	height: 200px;
	background-color: ${(props) => props.theme.backgroundColor};
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${rotateAnimation} 1s linear infinite;
	${Emoji} {
		&:hover {
			font-size: 40px;
		}
		&:active {
			opacity: 0;
		}
	}
`;

function App() {
	return (
		<Wrapper>
			<Box>
				<Emoji as="p">☆o(≧▽≦)o☆</Emoji>
			</Box>
			<Emoji>╰(*°▽°*)╯╰(*°▽°*)╯</Emoji>
		</Wrapper>
	);
}

export default App;
