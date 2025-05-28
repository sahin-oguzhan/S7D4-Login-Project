import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Button } from "reactstrap";

export default function Success() {
    const history = useHistory();
return (
        <div>
            <h1>Kayıt Başarılı!</h1>
            <Button onClick={() => history.push("/")}>Geri Dön</Button>
        </div>
    );
}