import React from 'react';
import {Form, Input, Button, MessagePlugin, FormRule} from 'tdesign-react';
import axios from 'axios';
import {UserDetailDTO} from "../tools/apifox";

const {FormItem} = Form;

export default function UpdateUserForm(props: { user: UserDetailDTO, set_user: any }) {
    const form_ref = React.createRef();

    const [form] = Form.useForm();

    const realname = Form.useWatch('realname', form);
    const email = Form.useWatch('email', form);


    const onSubmit = (e: any) => {
        console.log(e);
        if (e.validateResult === true) {
            //获取用户积分金币

            let user_copy = JSON.parse(JSON.stringify(props.user))
            user_copy.realName = realname;
            user_copy.email = email;
            console.log(user_copy);
            axios({
                method: "put",
                url: "https://mock.apifox.cn/m1/1898652-0-default/user/detail",
                data: user_copy,
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    props.set_user(user_copy);
                    MessagePlugin.info('提交成功');
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    MessagePlugin.error('提交出错');
                });
        }
    };

    const onReset = (e: any) => {
        console.log(e);
        MessagePlugin.info('重置成功');
    };

    const resetValidate = () => {
        // form_ref.current.clearValidate();
    };

    // 自定义校验器，不同的值输出不同的校验结果
    function passwordValidator(val: string) {
        const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (!reg.test(val)) { //正则验证不通过，格式不对
            return {result: false, message: '邮箱格式不正确', type: 'error' as ('error' | 'warning' | 'success')};
        }
        return {result: true, message: 'Ok', type: 'success' as ('error' | 'warning' | 'success')};
    }

    const rules: { [x: string]: FormRule[]; } = {
        realname: [
            {required: true, message: '必填', type: 'error'},
            {min: 2, message: '至少需要两个字', type: 'error'},
        ],
        email: [
            {required: true, message: '必填', type: 'error'},
            {validator: passwordValidator},
        ],
    };

    return (
        <Form ref={form_ref} form={form} statusIcon={true} onSubmit={onSubmit} onReset={onReset} labelWidth={100}
              rules={rules}>
            <FormItem label="真实姓名" name="realname" initialData={props.user.realName}>
                <Input/>
            </FormItem>
            <FormItem label="邮箱" name="email" initialData={props.user.email}>
                <Input/>
            </FormItem>
            <FormItem style={{marginLeft: 100}}>
                <Button theme="primary" type="submit">
                    提交
                </Button>
                <Button theme="default" type="reset" style={{margin: '0 12px'}}>
                    重置
                </Button>
                <Button theme="default" onClick={resetValidate}>
                    清除校验状态
                </Button>
            </FormItem>
        </Form>
    );
}
