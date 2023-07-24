import { setItem } from '../../utils/storage.js';
import { push } from '../../routes/index.js';
import { baseEncode } from '../../utils/baseEncode.js';

export default function SideBarHeader({ $target, initialState, onNameChange }) {
    const $header = document.createElement('h2');
    $header.className = 'sidebar-header';
    $target.appendChild($header);
    this.state = initialState;

    this.render = () => {
        $header.textContent = `${this.state}`;
    };

    this.render();

    this.setState = (nextState) => {
        this.state = nextState;
        setItem('x-username', this.state);
        this.render(); // 상태가 변경될 때마다 화면을 갱신하도록 추가
    };

    $header.addEventListener('click', () => {
        let name = '';
        while (true) {
            const result = prompt('닉네임을 입력해주세요!', this.state); // 결과를 먼저 임시 변수에 저장
            if (result === null) {
                return;
            }

            name = result.trim();

            if (name && name.length <= 10) {
                break;
            }

            alert('닉네임은 1자 이상 10자 미만으로 입력해주세요!');
        }
        this.setState(name);
        onNameChange(name);
        push('/');
    });
}
