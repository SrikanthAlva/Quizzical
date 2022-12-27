import { nanoid } from "nanoid";
import { decode } from 'html-entities';

export default function Quiz(props:any) {

    return (
    <div>
        <h2 className="question">{decode(props.question)}</h2>
        <div className='options'>
            {props.options.map((opt:any) => {
                const styles = () => {
                    if(props.selected === opt) {
                        if(props.reveal){
                            if(props.selected === props.answer){
                                return {border: "none", backgroundColor: "#94D7A2"}
                            } else {
                                return {border: "none", backgroundColor: "#F8BCBC"}
                            }
                        } else {
                            return {border: "none", backgroundColor: "#D6DBF5"}
                        }
                    } else {
                        if(props.answer === opt && props.reveal){
                            return {border: "none", backgroundColor: "#94D7A2"}
                        }
                        return {   border: "", backgroundColor: "" };
                    }                                         
                }
                return (
                    <input type="button" className="option" style={styles()} value={decode(opt)} onClick={()=> props.setIsHeld(props.id, opt)} disabled={props.reveal} key={nanoid()}/>
                )
            })}
        </div>
        <hr/>
    </div>
    )
}

