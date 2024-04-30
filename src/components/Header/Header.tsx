import styles from './Header.module.css';
const Header = () => {
    console.log("Rendering Header");
    return (
        <header className={styles.header}>
            <p>Some Management Application</p>
        </header>

    );
};

export default Header;